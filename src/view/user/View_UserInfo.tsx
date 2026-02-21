import icon from '@/assets/react.svg';
export default function () {
    return <div className="userInfo text_0">
        <div className='text-center mb-2'>
            <img className='h-20 w-20 border-2 rounded-md' style={{ borderColor: 'var(--theme_0)' }} src={icon} alt="头像" />
        </div>
        <div>
            <span className='mr-2' style={{ color: 'var(--theme_0)' }}>邮箱:</span>
            <span className=''>1772081518@qq.com</span>
        </div>
        <div>
            <span className='mr-2' style={{ color: 'var(--theme_0)' }}>注册时间:</span>
            <span className=''>2026-1-1 00:00:00</span>
        </div>
        <div>
            <span className='mr-2' style={{ color: 'var(--theme_0)' }}>用户名:</span>
            <span className=''>头号玩家</span>
        </div>
        <div>
            <span className='mr-2' style={{ color: 'var(--theme_0)' }}>性别:</span>
            <span className=''>男</span>
        </div>
    </div>
}