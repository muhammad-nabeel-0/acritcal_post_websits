import React, { useEffect, useState } from 'react'
import { useAppWrite } from '../context/AppwriteContext'
import ArticleCard from './ArticleCard'

const Article = () => {
  const [data,setData] = useState([])
  const {listData} = useAppWrite()
  useEffect(()=>{
    const  fetchData = async()=>{
     const  res = await listData()
     if(res?.documents){
       setData(res.documents)
       console.log("Fetched on mount:", res.documents)
     }
    }
    fetchData()
  },[])
  
  return (
    
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
  {data.map((item) => (
   <ArticleCard
   key={item.$id}
   id={item.$id}
   postTitle={item.postTitle}
   postImage={item.postImage}
   content={item.content}
   author={item.author}
   uploadDate={item.uploadDate}
   category={item.category}
 />
  ))}
</div>
  )
}

export default Article
