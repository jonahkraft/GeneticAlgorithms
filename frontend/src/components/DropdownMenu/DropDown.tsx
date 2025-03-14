import makeDropDown, { InjectedCounterProps } from './MakeDropDown';
import style from './DropDown.module.css'

export interface DropDownProps extends InjectedCounterProps {
    style?: React.CSSProperties;
}

const DropDown = (props: DropDownProps) => (
    <div className={style.wrapper}>
        <button className={style.ddSelector} onClick={props.onChange}>Select Generation</button>
        {props.open ?
            <ul className={style.dropdownContent}>
                {props.text.map((item) => (
                    <li key={item}>
                        <button
                            className={style.ddItem}
                            onClick={() => {
                                console.log("item clicked", item)
                                props.onChange();
                                props.callBack.doWork(Number(item))
                            }}
                        >
                            Generation {item}
                        </button>
                    </li>
                ))}
            </ul> :
            null
        }
    </div>
);

export default makeDropDown(DropDown);