import React from "react";

const About = props => {
  return (
    <>
      <section className='section'>
        <div className='container'>
          <h1 className='title'>About us</h1>
          <h2 className='subtitle'>Save the environment or share food trying</h2>
          <div
            className='container container-about'
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "40px"
            }}
          >
            <div
              className='img'
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "40px"
              }}
            >
              <img src='/green-removebg.png' alt='green' />
              <span>Save environment</span>
            </div>
            <div
              className='img'
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "40px"
              }}
            >
              <img src='/money.png' alt='moneypic' />
              <span>Save money</span>
            </div>
            <div
              className='img'
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "40px"
              }}
            >
              <img src='/Social-removebg.png' alt='socialpic' />
              <span style={{marginTop: '30px'}}>Make social connections</span>
            </div>
          </div>
        </div>
      </section>

      <section className='section'>
        <h1>Comments</h1>
        <article className='media'>
          <figure className='media-left'>
            <p className='image is-64x64'>
              <img
                src='/profilepics/Dessy.jpg'
                alt='comment-starter-pic'
              />
            </p>
          </figure>
          <div className='media-content'>
            <div className='content'>
              <p>
                <strong>Dessy Lidyasari</strong>
                <br />
                I love this app. There is so much good and healthy food that
                otherwise would be thrown away. I already was able to pick up
                many vegetables from farmers nearby. I go together with my
                husband and my babydaughter Stella. She always likes to go to the
                farm and sometimes see the animals there. The vegetables we get
                I use to prepare the babyfood.
                <br />
                <small>
                  <a href="/#">Like</a> · <a href="/#">Reply</a> · 3 hrs
                </small>
              </p>
            </div>

            <article className='media'>
              <figure className='media-left'>
                <p className='image is-48x48'>
                  <img
                    src='/profilepics/Stella.jpg' 

                    alt='comment-reply-pic'
                  />
                </p>
              </figure>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>Stella Putri Homminga </strong>
                    <br />
                    Thanks mummy! The food is so yummy! Especially the tomatoes
                    were so good. Hopefully we can get them I can and daddy can
                    make the delicious spaghetti!
                    <br />
                    <small>
                      <a href="/#">Like</a> · <a href="/#">Reply</a> · 2 hrs
                    </small>
                  </p>
                </div>
              </div>
            </article>

            <article className='media'>
              <figure className='media-left'>
                <p className='image is-48x48'>
                  <img
                    src='/profilepics/Oma.jpg'
                    alt='comment-reply-pic1'
                  />
                </p>
              </figure>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>Oma</strong>
                    <br />
                    OW this is so nice. I love to cook with all the ingredients
                    we get from this app. And next time I will join to the farm.
                    Or I can watch Stella when you need to go pick up the
                    groceries.
                    <br />
                    <small>
                      <a href="/#">Like</a> · <a href="/#">Reply</a> · 2 hrs
                    </small>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </article>
        <article className='media'>
          <figure className='media-left'>
            <p className='image is-64x64'>
              <img
                src={
                  props.user.img
                    ? `${process.env.REACT_APP_URL}/images/${props.user.img}`
                    : `https://bulma.io/images/placeholders/128x128.png`
                }
              alt='user-image3'/>
            </p>
          </figure>
          <div className='media-content'>
            <div className='field'>
              <p className='control'>
                <textarea className='textarea' placeholder='Add a comment...' />
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button className='button'>Post comment</button>
              </p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default About;
