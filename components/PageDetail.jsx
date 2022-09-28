import React from 'react'
import { getContentFragment } from '../util'

const PageDetail = ({ page }) => (
  <div className="pb-12 my-8 page text-gray-900 dark:text-gray-300 page-details page">
    {page.content.raw.children.map((typeObj, index) => {
      const children = typeObj.children.map((item, itemindex) =>
        getContentFragment(itemindex, item.text, item)
      )

      return getContentFragment(index, children, typeObj, typeObj.type)
    })}
  </div>
)

export default PageDetail
