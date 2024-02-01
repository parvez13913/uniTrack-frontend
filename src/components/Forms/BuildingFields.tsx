import Loading from "@/app/loading";
import { useBuildingsQuery } from "@/redux/api/buildingApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

const BuildingFields = () => {
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
      name="building"
      label="building"
      options={buildingsOptions as SelectOptions[]}
      size="large"
      placeholder="Select"
    />
  );
};

export default BuildingFields;
