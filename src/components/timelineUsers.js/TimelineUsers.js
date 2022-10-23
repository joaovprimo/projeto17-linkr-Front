import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import styled from "styled-components";
import UserContext from "../../context/UserContext";
import { device } from "../../mediaqueries/devices";
import { getPosts, getUserId, postPublicate } from "../../services/linkr";
import Post from "./Post.js";



export default function TimelineUsers() {
  const [posts, setPosts] = useState([]);
  const [posts2, setPosts2] = useState([]);
  const [loading, setLoading] = useState(true);

  const { tasks, setTasks } = useContext(UserContext);

  const {user,id}=useParams();
  
  
  useEffect(() => {
    const promisse = getPosts();
    promisse.then((res) => {
      setPosts(res.data);
      setLoading(false);  
    });
    promisse.catch((error) =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );

    getUserId(id).then((e)=>{
      setPosts2(e.data);
      console.log(posts2);
    }).catch((err)=>{
      console.log(err);
    });


  }, [posts]);

  


  return (
    <Wrapper>
      {" "}
      <h1 className="timeline__title">timeline {user}</h1>
      <main className="container">
        <div className="content">
          {loading ? (
            <div className="content__search">
              {" "}
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#333333"
                color="#151515"
              />
            </div>
          ) : posts2.length === 0 ? (
            <div className="content__empty">There are no posts yet</div>
          ) : (
            posts2.map((value, index) => (
              <Post
                key={index}
                name={value.name}
                description={value.description}
                image={value.image}
                urlInfo={value.urlInfo}
                url={value.url}
              />
            ))
          )}
        </div>
      </main>
      <aside></aside>
    </Wrapper>
  );
};
const Publicate = styled.div`
  height: 20rem;
  width: 100%;
  border-radius: 1rem;
  background-color: white;
  margin-bottom: 3rem;
  display: flex;
  padding: 1rem;

  @media ${device.mobileM} {
    div {
      display: none;
    }
  }

  div {
    width: 10%;
    height: 100%;
  }
  form {
    width: 100%;
    margin-left: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    label {
      font-size: 1.8rem;
      color: #707070;
      margin-bottom: 0.5rem;
    }
    input {
      border: none;
      height: 2rem;
      border-radius: 3px;
      margin-bottom: 0.5rem;
      background-color: #efefef;
      padding-left: 1rem;
      color: #949494;
      ::placeholder {
        font-size: 1rem;
      }
    }
    textarea {
      resize: none;
      border: none;
      min-height: 8rem;
      background-color: #efefef;
      padding-left: 1rem;
      padding-top: 1rem;
      color: #949494;
      box-sizing: border-box;
      ::placeholder {
        font-size: 1rem;
      }
    }
    button {
      border-radius: 4px;
      background-color: #1877f2;
      color: white;
      border: none;
      height: 2.5rem;
      width: 10rem;
    }
  }

  img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const Wrapper = styled.div`
  width: 70vw;
  display: block;
  margin: 3rem auto 0 auto;
  position: relative;

  @media ${device.mobileM} {
    margin: 0;
    width: 100%;
  }

  .container {
    max-width: 60%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    font-family: "Lato", sans-serif;
    @media ${device.mobileM} {
      max-width: 100%;
    }
  }
  .content {
    max-width: 100%;
    &__search {
      display: flex;
      justify-content: center;
    }
    &__empty {
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
    }
  }

  .timeline__title {
    font-size: 3rem;
    color: white;
    margin-bottom: 3rem;
  }
`;
