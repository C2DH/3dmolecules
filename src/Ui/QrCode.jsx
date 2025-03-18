const QrCode = () => {
  return (
    <div className="absolute w-full h-screen hidden sm:block">
      <div className="flex flex-col justify-center items-center absolute bottom-6 right-6 opacity-60">
        <img className="QrCode" width="80px" height="80px" src="./qrcode.svg" alt="QR Code" />
        <span className="text-center text-sm mt-[-0.2rem] leading-[0.9rem]">
          View on
          <br />
          mobile
        </span>
      </div>
    </div>
  )
}
export default QrCode
