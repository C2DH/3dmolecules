import { useTranslation } from 'react-i18next'

const QrCode = () => {
  const { t } = useTranslation()
  const view_on_mobile = t('view on mobile')

  return (
    <div className="absolute w-full h-screen hidden sm:block">
      <div className="flex flex-col justify-center items-center absolute bottom-6 right-6 opacity-60">
        <img className="QrCode" width="80px" height="80px" src="./qrcode.svg" alt="QR Code" />
        <span
          className="text-center text-sm mt-[-0.2rem] leading-[0.9rem]"
          dangerouslySetInnerHTML={{ __html: view_on_mobile }}
        />
      </div>
    </div>
  )
}
export default QrCode
