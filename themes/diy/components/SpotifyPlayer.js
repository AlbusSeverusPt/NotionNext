// import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useState } from 'react'
// import CONFIG from '../config'

/**
 * 跳转到网页顶部
 * 当屏幕下滑500像素后会出现该控件
 * @param targetRef 关联高度的目标html标签
 * @param showPercent 是否显示百分比
 * @returns {JSX.Element}
 * @constructor
 */
const SpotifyPlayer = () => {
  const { locale } = useGlobal()
  const [isIframeVisible, setIsIframeVisible] = useState(false)
  const toggleIframeVisibility = () => {
    setIsIframeVisible(!isIframeVisible)
  }
  
//   以后考虑是否要加上这个
//   if (!siteConfig('HEXO_WIDGET_TO_TOP', null, CONFIG)) {
//     return <></>
//   }

return (
    <div className='relative space-x-1 items-center justify-center transform hover:scale-105 duration-200 w-7 h-auto pb-1 text-center' onClick={toggleIframeVisibility} >
      <div title={locale.POST.TOP} ><i className='fas fa-arrow-up text-xs' /></div>
      {isIframeVisible && (
        <iframe
          src="https://example.com"
          title="example iframe"
          className="absolute top-0 left-0"
          style={{ display: isIframeVisible ? 'block' : 'none' }}
        ></iframe>
      )}
    </div>
  )

}

export default SpotifyPlayer