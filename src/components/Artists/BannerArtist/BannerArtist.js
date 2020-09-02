import React, { useState, useEffect } from "react";
import "./BannerArtist.scss";
import firebase from "../../../utils/Firebase";
import "firebase/storage";

export default function BannerArtist(props) {
  const { artist } = props;

  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`artist/${artist?.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBannerUrl(url);
      });
  }, [artist]);

  return (
    <div
      className="banner-artist"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div className="banner-artist__gradient" />
      <div className="banner-artist__info">
        <h3> ARTISTA</h3>
        <h1> {artist.name} </h1>
      </div>
    </div>
  );
}
