import icon from "../../assets/img/notification-item.svg";
import "./styles.css";

function NotificationButton(props) {
  return (
    <div className="dsmeta-red-btn-container">
      <div className="dsmeta-red-btn">
        <img src={icon} alt="Notificar" />
      </div>
    </div>
  );
}

export default NotificationButton;
