import PropTypes from "prop-types";

const Message = ({ authorId, content, timestamp }) => {
  return (
    <>
      <div className={`message ${authorId ? "right" : "left"}`}>
        <div className="message-text">{content}</div>
        <div className="message-time">{prettifyDate(timestamp)}</div>
      </div>
    </>
  );
};

Message.propTypes = {
  timestamp: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  authorId: PropTypes.bool.isRequired,
};

export default Message;

function prettifyDate(timestamp) {
  // Returns the date in hh:mm am/pm format
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(timestamp).toLocaleTimeString("en-US", options);
}
