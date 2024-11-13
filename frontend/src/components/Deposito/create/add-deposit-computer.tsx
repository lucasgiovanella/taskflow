import { Divider } from "antd";
import AddDepositForm from "./add-deposit-form";
import AddDepositFile from "./add-deposit-file";

const AddDepositComputer = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <AddDepositForm />
        <Divider type="vertical" style={{ height: "20px" }} />
        <AddDepositFile />
      </div>
    </>
  );
};

export default AddDepositComputer;
