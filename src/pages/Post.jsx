import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Button from '../components/Button'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'


function Post() {
  const [post,setPost] = useState(null) 
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData= useSelector(state=>state.auth.userData)
  const isAuthor = post && userData && post.userId === userData.$id
  const deletePost = async()=>{
    if(window.confirm("Are you sure You want to delete the Post")){
      appwriteService.deletePost(post.slug).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/")
        }
      })
    }
  }
  const fetchPost=async()=>{
    if(slug){

      appwriteService.getPost(slug).then((res)=>{
        if(res){
          setPost(res)
        }
        else{
          navigate("/")
        }
      })    
    }
  }
  useEffect(()=>{
    fetchPost()},[slug,navigate])

  return post ? (
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl' />
          { isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.slug}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" 
              onClick={deletePost}
              >Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post