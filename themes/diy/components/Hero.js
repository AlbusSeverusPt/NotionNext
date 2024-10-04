// import Image from 'next/image'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'
import WavesArea from './WavesArea'

let wrapperTop = 0

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }

  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          changeType(
            new window.Typed('#typed', {
              strings: GREETING_WORDS,
              typeSpeed: 200,
              backSpeed: 100,
              backDelay: 400,
              showCursor: true,
              smartBackspace: true
            })
          )
        }
      })
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  })

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      // className的值原为w-full h-screen relative bg-black
      className='w-full relative bg-black z-1 h-[50vh] min-h-[25rem] min-w-[25rem] flex flex-col justify-center items-center'>
      {/* className的值原为text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full  */}
      <div className='text-white flex flex-col items-center justify-center z-10'>
        {/* 站点标题 */}
        {/* className的值原为font-black text-4xl md:text-5xl shadow-text */}
        <div className='py-5 font-black text-4xl md:text-5xl shadow-text'>
          {siteInfo?.title || siteConfig('TITLE')}
        </div>
        {/* 站点欢迎语 */}
        {/* className的值原为mt-2 h-12 items-center text-center font-medium shadow-text text-lg */}
        <div className='h-12 items-center text-center font-medium shadow-text text-lg font-serif'>
          <span id='typed' />
        </div>

        {/* 首页导航大按钮 */}
        {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && (
          <NavButtonGroup {...props} />
        )}

        {/* 滚动按钮 */}
        <div
          onClick={scrollToWrapper}
          className='z-10 cursor-pointer w-full text-center py-4 text-3xl absolute bottom-10 text-white'>
          <div className='opacity-70 animate-bounce text-xs'>
            {siteConfig('HEXO_SHOW_START_READING', null, CONFIG) &&
              locale.COMMON.START_READING}
          </div>
          <i className='opacity-70 animate-bounce fas fa-angle-down' />
        </div>
      </div>

      <LazyImage
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        // 原来className的$前的值应为header-cover w-full h-screen object-cover object-center
        className={`header-cover w-full h-screen min-h-[25rem] object-cover object-center fixed left-0 z-1 ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      />
      <WavesArea />
    </header>
  )
}

export default Hero
