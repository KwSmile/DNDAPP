import { useState } from "react"
import axios from 'axios'

export default function DicePage() {
    const [resList, setResList] = useState([])

    const dice = [4, 6, 8, 10, 12, 20]
    const [customDice, setCustomDice] = useState([13])
    const doubleDice = [20]
    const multiDice = [4, 6, 8, 10, 12]

    const addRes = (data, num, max, format) => {
        setResList(prev => {
            let newb = [...prev]
            if (format === 'solo') {
                newb.push({ data, num, max })
            }
            else if (format === 'double') {
                let reformedData = `[${data.split('\n', num).join(', ')}]`
                newb.push({ data: reformedData, num, max })
            }
            else if (format === 'multi') {
                let arr = []
                arr = data.split('\n', num)
                let reformedData = 0
                arr.forEach(function (item) {
                    reformedData += parseInt(item)
                })
                newb.push({ data: reformedData, num, max })
            }

            if (newb.length > 13) {
                newb.shift()
            }
            return newb
        })
    }

    const getData = async (num, max, format) => {
        // https://www.random.org/integers/?num=${num}&min=1&max=${max}&col=1&base=10&format=plain&rnd=new
        const { data } = await axios(`https://www.random.org/integers/?num=${num}&min=1&max=${max}&col=1&base=10&format=plain&rnd=new`)
        if (data) {
            addRes(data, num, max, format)
        }
        else {
            console.log('api error, random via Math.random()')
            addRes(Math.round(Math.random() * (max - 1) + 1))
        }
    }

    const diceElement = dice.map((item, i) => (
        <div key={i}>
            <button onClick={() => getData(1, item, 'solo')}>{`d${item}`}</button>
        </div>
    ))

    const customDiceElement = customDice.map((item, i) => (
        <div key={i}>
            <button onClick={() => getData(1, item, 'solo')}>{`d${item}`}</button>
            <button onClick={() => onRemoveCustom(i)}>-</button>
        </div>
    ))
    const onRemoveCustom = (i) => {
        setCustomDice(prev => {
            let newb = [...prev]
            let temp = newb[newb.length - 1]
            newb[newb.length - 1] = newb[i]
            newb[i] = temp
            newb.pop()
            console.log(newb)
            return newb
        })
    }

    const [custom, setCustom] = useState(2)
    const onAddCustom = () => {
        setCustomDice(prev => {
            let newb = [...prev]
            newb.push(Number(custom))
            return newb
        })
    }
    const onCustom = (e) => {
        let num = e.target.value
        if (num > 999) num = 999
        else if (num < 1) num = 1
        setCustom(num)

    }
    const addCustomDiceElement = (
        <div>
            <input
                type="number"
                name="custom"
                id="custom"
                max={999}
                min={2}
                value={custom}
                onChange={onCustom}
            />
            <input
                type="button"
                name="add"
                id="add"
                value={'+'}
                onClick={onAddCustom}
            />
        </div>
    )

    const doubleDiceElement = doubleDice.map((item, i) => (
        <div key={i}>
            <button onClick={() => getData(2, item, 'double')}>{`2d${item}`}</button>
        </div>
    ))

    const [multi, setMulti] = useState(2)
    const onMulti = (e) => {
        let num = e.target.value
        if (num > 999) num = 999
        else if (num < 1) num = 1
        setMulti(num)

    }
    const multiNumElement = (
        <div>
            <input
                type="number"
                name="multi"
                id="multi"
                max={999}
                min={2}
                value={multi}
                onChange={onMulti}
            />
        </div>
    )
    const multiDiceElement = multiDice.map((item, i) => (
        <div key={i}>
            <button onClick={() => getData(multi, item, 'multi')}>{`${multi}d${item}`}</button>
        </div>
    ))

    const resultListElement = resList.toReversed().map(({ data, num, max }, i) => (
        <div key={i}>{`[${num}d${max}]: ${data}`}</div>
    ))
    const resultElement = resultListElement && (
        <div>
            {resultListElement}
        </div>
    )

    return (
        <div>
            {diceElement}
            {customDiceElement}
            {addCustomDiceElement}
            {doubleDiceElement}

            {multiNumElement}
            {multiDiceElement}

            {resultElement}
        </div>
    )
}