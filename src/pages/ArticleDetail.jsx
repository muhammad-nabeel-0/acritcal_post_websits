import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppWrite } from '../context/AppwriteContext'
import { CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

const ArticleDetail = () => {
  const { id } = useParams()
  const { db, appWriteDataBaseId, appWriteCollectionId } = useAppWrite()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await db.getDocument(appWriteDataBaseId, appWriteCollectionId, id)
        setArticle(res)
      } catch (error) {
        console.error("Error fetching article:", error)
      }
    }

    getArticle()
  }, [id])

  if (!article) return <div className="text-center flex items-center justify-center py-40">
    <div className="w-40 h-40 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>

  return (
    <div className=" mx-auto p-6">
    <div className='relative w-full h-80 mb-6 overflow-hidden rounded-xl'>
        <img
            src={article.postImage}
            alt={article.postTitle}
              className="w-full h-full object-cover object-center"/>
    </div>
 
  <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white break-words">
    {article.postTitle}
  </h1>
  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex flex-wrap items-center gap-2">
    <div className="flex items-center gap-1">
      <UserIcon className="h-4 w-4" />
      <span>By {article.author}</span>
    </div>
    <span className="inline-block">•</span>
    <div className="flex items-center gap-1">
      <CalendarIcon className="h-4 w-4" />
      <span>{article.uploadDate}</span>
    </div>
    <span className="inline-block">•</span>
    <div className="flex items-center gap-1">
      <TagIcon className="h-4 w-4" /> {/* Assuming you have a TagIcon */}
      <span>{article.category}</span>
    </div>
  </div>
  <div
    className="  overflow-hidden text-wrap"
    dangerouslySetInnerHTML={{ __html: article.content }}
  />
</div>
  )
}

export default ArticleDetail
