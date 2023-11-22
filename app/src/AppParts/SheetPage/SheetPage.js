import { useForm } from 'react-hook-form';
import style from './SheetPage.module.scss'

export default function SheetPage() {
    const {
        register,
        handleSubmit,
        watch,
        // formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} />
                <input {...register('class')} />
                <textarea {...register('desc')} />
                <input type="submit" value={'save'} />
            </form>

            <button onClick={()=>console.log(watch())}>watch</button>-/
        </>
    )

}