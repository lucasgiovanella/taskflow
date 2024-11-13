import { useEffect, useState } from "react";
import { Select } from "antd";
import {
  Option,
  fetchModelos,
  formatOptions,
} from "../../../utils/dataModelos";

interface SelectModeloProps {
  index: number; // índice da linha na tabela
  handleModelChange: (model: string, index: number) => void;
  initialValue?: string;
}

const SelectModelo: React.FC<SelectModeloProps> = ({
  index,
  handleModelChange,
  initialValue
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchData() {
      const modelos = await fetchModelos();
      const groupedOptions = formatOptions(modelos);
      setOptions(groupedOptions.flatMap((group) => group.options));
    }

    fetchData();
  }, []);

  return (
    <Select
      showSearch
      options={options}
      placeholder="Selecione o Modelo"
      defaultValue={initialValue}
      style={{ width: "100%", color: "white" }}
      onChange={(value) => {
        handleModelChange(value, index);
      }}
    />
  );
};

export default SelectModelo;
