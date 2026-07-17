import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerUser } from '../../api/auth';
import { Link } from 'react-router-dom';

function RegistrationPage() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || !passwordsMatch) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    event.preventDefault();
    setValidated(true);

    // Combine first and last name as username
    const username = `${formData.firstName} ${formData.lastName}`.trim();
    const data = await registerUser(username, formData.email, formData.password);

    if (data.success) {
      setSuccess(true); // show "check your email" message
    } else {
      setError(data.error || 'Registration failed. Please try again.');
    }
  };

  // Show success message after registration
  if (success) {
    return (
      <Container className="py-5" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h2>Check your email!</h2>
        <p>We sent a verification link to <strong>{formData.email}</strong>. Click it to activate your account before logging in.</p>
        <Link to="/">Back to Login</Link>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Create an Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="registerFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="registerLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="registerPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
            />
            <Form.Control.Feedback type="invalid">
              Password must be at least 8 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="registerConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              required
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={validated && !passwordsMatch}
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="registerTerms">
          <Form.Check
            required
            label="I agree to the terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <div className="d-flex align-items-center gap-3">
          <Button type="submit">Register</Button>
          <Link to="/">Back to Login</Link>
        </div>
      </Form>
    </Container>
  );
}

export default RegistrationPage;