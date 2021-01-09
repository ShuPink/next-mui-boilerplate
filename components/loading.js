import { RingLoader } from "components/svgs";
import s from "./loading.module.scss";

function LoadingPage() {
  return (
    <div className={s.loading}>
      <RingLoader height="80" width="80" />
    </div>
  );
}

export default LoadingPage;
