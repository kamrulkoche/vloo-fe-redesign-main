export default function CommonButton({
  name,
  bgColor = "#006988",
  hoverColor = "#0C4C60",
  textColor = "",
  borderColor = "",
  px,
  py,
  textSize = "",
  fontWeight = "",
  leading = "",
  width = "",
  onClick = () => {},
  disabled = false,
}) {
  return (
    <button
      className={`h-[60px] w-[120px] rounded-[5px] text-[18px] font-medium leading-[24px] text-white transition duration-200 sm:w-[180px]`}
      style={{
        backgroundColor: disabled ? "#DEDEDE" : bgColor,
        color: disabled ? "#BEBEBE" : textColor,
        borderColor: disabled ? "#BEBEBE" : borderColor,
        paddingLeft: px,
        paddingRight: px,
        paddingTop: py,
        paddingBottom: py,
        fontWeight: fontWeight,
        fontSize: textSize,
        lineHeight: leading,
        width: width,
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = hoverColor)}
      onMouseLeave={(e) => (e.target.style.backgroundColor = bgColor)}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
