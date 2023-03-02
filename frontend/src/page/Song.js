import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

function Song() {
  const { id } = useParams();
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`/api/lyric/${id}`);
    const json = await response.json();
    setLyrics(json);
    console.log(lyrics);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  console.log(lyrics);

  if (loading) {
    return (
      <div
        className="loader"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScaleLoader color="#3A54AA" size={150} />
      </div>
    );
  }

  return (
    <div className="Song-container">
      <div className="Song-name-div">
        <img src={lyrics.lyric.image} alt="" />
        <article>
          <h1>{lyrics.lyric.SongName}</h1>
          <h3>{lyrics.lyric.Artist}</h3>
          <p>posted by: {lyrics.lyric.postedBy.name}</p>
        </article>
      </div>
      <div className="Song-lyrics-div">
        <div>
          <p>
            {lyrics.lyric.lyrics}
            {/* [Verse 1: Stephen Sanchez] GeorgiaWrap me up in all your— I want ya
            In my arms, oh, let me Hold ya I'll never let you go again Like I
            did Oh, I used to say [Chorus: Stephen Sanchez & Georgia Brown] "I
            would never fall in love again until I found her" I said, "I would
            never fall, unless it's you I fall into" I was lost within the
            darkness, but then I found her I found you [Verse 2: Stephen Sanchez
            & Georgia Brown] Georgia Pulled me in, I asked to Love her Once
            again, you fell, I Caught ya I'll never let you go again Like I did
            Oh, I used to say [Chorus: Stephen Sanchez & Georgia Brown] "I would
            never fall in love again until I found her" I said, "I would never
            fall unless it's you I fall into" I was lost within the darkness,
            but then I found her I found you [Guitar Solo][Chorus: Stephen
            Sanchez & Georgia Brown]" I would never fall in love again until I
            found her" I said, "I would never fall unless it's you I fall into"
            I was lost within the darkness, but then I found her I found you */}
          </p>
        </div>
        <div>
          <div className="AboutSongBox">
            <h3>About the Song</h3>
            <p>
              {lyrics.lyric.aboutLyrics}
              {/* During the time he wrote this song, Stephen was dating a girl
              named Georgia. They were in a long-distance relationship, which
              ended when he “pushed her away” to mentally protect her from
              issues that were going on in his life. As the sentence is
              incomplete, it probably implies that there’s still a lot that he
              wants to experience in the relationship. */}
            </p>
            <button className="improvementbutton">
              Suggest an improvement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Song;
