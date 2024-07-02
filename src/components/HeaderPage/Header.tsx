import appLogo from '../../assets/appLogo.png'

const Header = () => {
  return (
    <div className='appLogo h-[7vh] w-full flex items-center justify-center flex-col border-b-[1px solid black]'>
        <img src={appLogo} className='w-28 pt-1'/>
      </div>
  )
}

export default Header
