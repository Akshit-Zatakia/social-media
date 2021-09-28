import { useSelector } from "react-redux";

function Alert() {
  // get alerts from redux
  const alerts = useSelector((state) => state.alert);

  return (
    alerts &&
    alerts.map((a) => {
      return (
        <div key={a.id} class={`alert alert-${a.alertType}`} role="alert">
          {a.msg}
        </div>
      );
    })
  );
}

export default Alert;
