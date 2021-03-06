import lowerCase from "lodash/lowerCase";
import FileInput from "./FileInput";
import NumberInput from "./NumberInput";
import { Options, Values } from "./types";

export default <TOptions extends Options>({
  options,
  values,
  onChange,
}: {
  options: TOptions;
  values: Values<TOptions>;
  onChange: (newValues: Values<TOptions>) => any;
}) => {
  return (
    <>
      {Object.entries(options).map(([name, option]) => (
        <div className="Option" key={name}>
          <h4>{lowerCase(name)}</h4>
          {option.kind === "file" && (
            <FileInput
              value={values[name] as File | undefined}
              onChange={(newValue) => onChange({ ...values, [name]: newValue })}
              accept={option.accept}
            />
          )}
          {option.kind === "number" && (
            <NumberInput value={values[name] as number} onChange={(newValue) => onChange({ ...values, [name]: newValue })} />
          )}
        </div>
      ))}
    </>
  );
};
