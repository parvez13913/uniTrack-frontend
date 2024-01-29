import Loading from "@/app/loading";
import { useBuildingsQuery } from "@/redux/api/buildingApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type BuildingProps = {
  name: string;
  label: string;
};

const BuildingFields = ({ name, label }: BuildingProps) => {
  const { data, isLoading } = useBuildingsQuery({
    limit: 100,
    page: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  const buildings = data?.buildings;
  const buildingsOptions = buildings?.map((building) => {
    return {
      label: building?.title,
      value: building?.id,
    };
  });
  return (
    <FormSelectField
      name={name}
      label={label}
      size="large"
      options={buildingsOptions as SelectOptions[]}
      placeholder="Select"
    />
  );
};

export default BuildingFields;
