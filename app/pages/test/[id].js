import { useRouter } from 'next/router'

export default function Test() {
	const router = useRouter()
	const { id } = router.query
	
	return(
		<div>
			{id}
		</div>
		)
}