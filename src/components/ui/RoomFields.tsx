import { useRoomsQuery } from "@/redux/api/roomApi";
import FormSelectField, { SelectOptions } from "../Forms/FormSelectField";
import Loading from "@/app/loading";

type RoomProps = {
  name: string;
  label?: string;
};

const RoomFields = ({ name }: RoomProps) => {
  const { data, isLoading } = useRoomsQuery({
    limit: 100,
    page: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  const rooms = data?.rooms;
  const roomsOptions = rooms?.map((room) => {
    return {
      label: room?.roomNumber,
      value: room?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label="Room"
      options={roomsOptions as SelectOptions[]}
    />
  );
};

export default RoomFields;
