import React from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import './styles.css'

const SignupSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string(),
	age: yup.number().required().positive().integer(),
	website: yup.string().url()
})

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(SignupSchema)
	})
	const [isShow, setIsShow] = React.useState(false)

	const onSubmit = (data) => {
		console.info(data)
	}

	const onError = (errors) => {
		console.error(errors)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)}>
			{isShow ? (
				<>
					<div>
						<label>First Name</label>
						<input type="text" {...register('firstName')} />
						{errors.firstName && <p>{errors.firstName.message}</p>}
					</div>
					<div style={{ marginBottom: 10 }}>
						<label>Last Name</label>
						<input type="text" {...register('lastName')} />
						{errors.lastName && <p>{errors.lastName.message}</p>}
					</div>
				</>
			) : (
				<>
					<div>
						<label>Age</label>
						<input type="text" {...register('age')} />
						{errors.age && <p>{errors.age.message}</p>}
					</div>
					<div>
						<label>Website</label>
						<input type="text" {...register('website')} />
						{errors.website && <p>{errors.website.message}</p>}
					</div>
				</>
			)}
			<button onClick={() => setIsShow((p) => !p)}>toggle</button>
			<input type="submit" />
		</form>
	)
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
