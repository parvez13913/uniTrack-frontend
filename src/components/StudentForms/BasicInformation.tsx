import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import FormDatePicker from "../Forms/FormDatePicker";
import { bloodGroupOptions } from "@/constants/global";
import FormTextArea from "../Forms/FormTextArea";

const BasicInformation = () => {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      <p style={{ fontSize: "18px", fontWeight: "700", margin: "5px 0px" }}>
        Basic information
      </p>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            type="email"
            name="student.email"
            size="large"
            label="Email"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            type="text"
            name="student.contactNo"
            size="large"
            label="Contact Number"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            type="text"
            name="student.emergencyContactNo"
            size="large"
            label="Emergency Contact Number"
          />
        </Col>
        <Col
          className="gutter-row"
          span={12}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormDatePicker
            name="student.dateOfBirth"
            size="large"
            label="Date Of Birth"
          />
        </Col>
        <Col
          className="gutter-row"
          span={12}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormSelectField
            name="student.bloodGroup"
            size="large"
            label="Blood Group"
            options={bloodGroupOptions}
            placeholder="Select"
          />
        </Col>
        <Col
          className="gutter-row"
          span={12}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormTextArea
            name="student.presentAddress"
            label="Present Address"
            rows={4}
          />
        </Col>
        <Col
          className="gutter-row"
          span={12}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormTextArea
            name="student.permanentAddress"
            label="Permanent Address"
            rows={4}
          />
        </Col>
      </Row>
    </div>
  );
};

export default BasicInformation;
