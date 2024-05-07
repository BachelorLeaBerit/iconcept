import { Highlight } from "react-instantsearch";
import '../../../../styles/Term.css';

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
