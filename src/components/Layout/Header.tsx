import redberryLogo from '@/assets/img/redberryLogo.png'

const Header = () => {
  return (
    <header className="flex justify-start border border-primary-gray-border px-globalPx py-[38px]">
      <div>
        <a href="/">
          <img src={redberryLogo} alt="Logo" className="h-6 w-[150px]" />
        </a>
      </div>
    </header>
  )
}

export default Header
