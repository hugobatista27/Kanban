import imgWelcome from '../assets/imgWelcome.svg'

export default function Slogan() {
    return (
        <div id="boxSlogan">
            <div className="slogan">
                <ul>
                    <li>Organize,</li>
                    <li>Visualize,</li>
                    <li>Conquiste</li>
                </ul>
                <p>Seu fluxo de trabalho simplificado!</p>
            </div>
            <img src={imgWelcome} alt="" />
        </div>
    )
}