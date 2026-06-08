import { site } from "@/lib/site";
import WazeLink from "@/components/WazeLink";

type OfficeAddressProps = {
  className?: string;
  addressClassName?: string;
  wazeClassName?: string;
  showWaze?: boolean;
};

export default function OfficeAddress({
  className = "flex flex-wrap items-center gap-x-3 gap-y-2",
  addressClassName = "",
  wazeClassName = "",
  showWaze = true,
}: OfficeAddressProps) {
  return (
    <div className={className}>
      <span className={addressClassName}>{site.address}</span>
      {showWaze ? <WazeLink className={wazeClassName} /> : null}
    </div>
  );
}
