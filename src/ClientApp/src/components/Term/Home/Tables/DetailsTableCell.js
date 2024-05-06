import { Highlight } from "react-instantsearch";

const DetailsTableCell = ({
  header,
  translation,
  formData,
  name,
  text,
  handleChange,
  setText,
}) => {
  return (
    <tr>
      <th>{header}</th>
      <td>
        {translation.status === 2 ? (
          text ? (
            <textarea
              style={{ width: "100%" }}
              type="text"
              name={name}
              value={formData}
              onChange={handleChange}
             
            />
          ) : (
            <div onClick={() => setText(true)}>{formData}</div>
          )
        ) : (
          <Highlight attribute={name} hit={translation}>
            {formData}
          </Highlight>
        )}
      </td>
    </tr>
  );
};

export default DetailsTableCell;
