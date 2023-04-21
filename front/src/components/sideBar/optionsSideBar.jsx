import './optionsSideBar.css'

export default function OptionsSideBar(props) {

    return (
        <div>
            <ul>
                {props.buttons.map((object, index) => <li key={index} onClick={object.route} className={object.select ? 'selected' : ''}>{object.title}</li>
                )}
            </ul>
        </div>
    )
}