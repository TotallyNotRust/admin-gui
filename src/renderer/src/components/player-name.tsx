import { convertUnicode } from '@/lib/utils'
import unidecode from 'unidecode'

interface PlayerNameProps {
    name: string;
}

function PlayerName({ name }: PlayerNameProps) {
    const converted = unidecode(convertUnicode(name))
    const showConverted = converted !== name

    return (
        <>
            <span className="select-all">{name}</span>{showConverted && ' ('}
            {showConverted && (
                <span className="text-neutral-400 select-all">{converted}</span>
            )}{showConverted && ')'}
        </>
    )
}

export default PlayerName