import { Collapse } from "antd";

const { Panel } = Collapse;

export type ITemsProps = {
  key: string;
  label: string;
  children: React.ReactNode | React.ReactElement;
};

type UMCollapseProps = {
  items: ITemsProps[];
  onChange?: (element: string | string[] | "") => void;
  defaultActiveKey?: string[];
};

const UMCollapse = ({
  items,
  onChange,
  defaultActiveKey = ["1"],
}: UMCollapseProps) => {
  return (
    <Collapse defaultActiveKey={defaultActiveKey} onChange={onChange}>
      {items.map((item) => {
        return (
          <Panel header={item.label} key={item?.key}>
            {item?.children}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default UMCollapse;
