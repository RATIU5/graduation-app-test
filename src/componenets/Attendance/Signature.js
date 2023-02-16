import { c } from "../../functions/utils";
import styles from "./Signature.module.css";

function Signature(props) {
  return (
    <div>
      <p>{`[put some confirmation text here]`}</p>
      <label htmlFor="signature">Signature</label>
      <input
        id="signature"
        type="checkbox"
        checked={props.signed}
        onChange={props.onSignedChanged}
      />
      {props.person && props.signed && (
        <p
          className={c([styles.signature])}
        >{`${props.person.firstName} ${props.person.lastName}`}</p>
      )}
    </div>
  );
}

export default Signature;
