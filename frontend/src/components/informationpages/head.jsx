import { useState} from "react";

function Head () {
    return(
        <div className="sketchfab-embed-wrapper">
      <iframe
        title="Head Anatomy & Musculature"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
        src="https://sketchfab.com/models/b018e3f215c14be6ab5c52e5371c3ba5/embed"
      >
      </iframe>
      <p style={{ fontSize: '13px', fontWeight: 'normal', margin: '5px', color: '#4A4A4A' }}>
        <a
          href="https://sketchfab.com/3d-models/head-anatomy-musculature-b018e3f215c14be6ab5c52e5371c3ba5?utm_medium=embed&utm_campaign=share-popup&utm_content=b018e3f215c14be6ab5c52e5371c3ba5"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Head Anatomy & Musculature
        </a>{' '}
        by{' '}
        <a
          href="https://sketchfab.com/medicalanimation?utm_medium=embed&utm_campaign=share-popup&utm_content=b018e3f215c14be6ab5c52e5371c3ba5"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Fusion Medical Animation
        </a>{' '}
        on{' '}
        <a
          href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=b018e3f215c14be6ab5c52e5371c3ba5"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Sketchfab
        </a>
      </p>    
      </div>

    )
}
export default Head;