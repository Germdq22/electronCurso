import React, { useState, useEffect } from "react";
import "./Player.scss";
import { Grid, Progress, Icon, Input, Image } from "semantic-ui-react";
import ReactPlayer from "react-player";

// const songData = {
//   image:
//     "https://firebasestorage.googleapis.com/v0/b/musicfy-ef3bf.appspot.com/o/album%2Faa5ef3c8-78c5-4d90-a538-72333a63674f?alt=media&token=d2cc5d96-0d5a-4694-8340-37b77e44377f",
//   name: "Nezuko",
//   url: "",
// };

export default function Player(props) {
  const { songData } = props;
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    if (songData?.url) {
      onStart();
    }
  }, [songData]);

  const onStart = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  const onProgress = (data) => {
    setPlayedSeconds(data.playedSeconds);
    setTotalSeconds(data.loadedSeconds);
  };

  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          <Image src={songData?.image} />
          {songData?.name}
        </Grid.Column>

        <Grid.Column width={8} className="center">
          <div className="controls">
            <div className="controls">
              {playing ? (
                <Icon onClick={onPause} name="pause circle outline" />
              ) : (
                <Icon onClick={onStart} name="play circle outline" />
              )}
            </div>
          </div>

          <Progress
            progress="value"
            value={playedSeconds}
            total={totalSeconds}
            size="tiny"
          />
        </Grid.Column>

        <Grid.Column width={4} className="right">
          <Input
            type="range"
            label={<Icon name="volume up" />}
            min={0}
            max={1}
            step={0.01}
            name="volume"
            onChange={(e, data) => setVolume(Number(data.value))}
            value={volume}
          />
        </Grid.Column>
      </Grid>

      <ReactPlayer
        className="react-player"
        url={songData?.url}
        playing={playing}
        height="0"
        width="0"
        volume={volume}
        onProgress={(e) => onProgress(e)}
      />
    </div>
  );
}
