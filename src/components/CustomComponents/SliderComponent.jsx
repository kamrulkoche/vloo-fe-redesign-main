const Slider = ({ label, value, min, max, step, setValue, readOnly }) => {
  return (
    <div className="rounded-[10px] bg-[#0A2A3C] p-4">
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-[500] text-white">{label}</span>
        <span className="text-[16px] font-[500] text-white">
          {readOnly ? `NOK ${value}` : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step || 1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        readOnly={readOnly}
        className="mt-4 w-full"
      />
    </div>
  );
};

export default Slider;
