// import { siteConfig } from '@/lib/config'
// import { useGlobal } from '@/lib/global'
import { useState } from 'react'
// import CONFIG from '../config'

// SpotifyPlayer.js这个组件已被弃用
/**
 * 跳转到网页顶部
 * 当屏幕下滑500像素后会出现该控件
 * @param targetRef 关联高度的目标html标签
 * @param showPercent 是否显示百分比
 * @returns {JSX.Element}
 * @constructor
 */
const ButtonSpotifyPlayer = () => {
  // const { locale } = useGlobal()
  const [isIframeVisible, setIsIframeVisible] = useState(false)
  const toggleIframeVisibility = () => {
    setIsIframeVisible(!isIframeVisible)
  }
  
  const iframeData = {
    src: "https://open.spotify.com/embed/playlist/1QyiNXnjsUU32VgsEeBMJZ?utm_source=generator",
    className: "fixed left-10 w-100% h-152",
    // width: '100%',
    // height: '152',
    botton: '0',
    frameBorder: "0",
    allowFullScreen: "",
    allow: "clipboard-write; encrypted-media; fullscreen; picture-in-picture",
    loading: "lazy",
    style: {
      display: isIframeVisible ? 'block' : 'none',
      borderRadius: '12px', // 添加 border-radius 样式
    }
  }
  
//   以后考虑是否要加上这个
//   if (!siteConfig('HEXO_WIDGET_TO_TOP', null, CONFIG)) {
//     return <></>
//   }

return (

    <div className='relative space-x-1 items-center justify-center transform  duration-200 w-7 h-auto pb-1 text-center ' onClick={toggleIframeVisibility} >
      <div title='Spotify' ><i className='fa-solid fa-music text-xs hover:scale-105' /></div>
      <iframe style={{display: isIframeVisible ? 'block' : 'none'}}{...iframeData}></iframe>
    </div>
    
  )

}

export default ButtonSpotifyPlayer