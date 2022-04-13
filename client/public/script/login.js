const form = document.querySelector('form')
        const userErr = document.querySelector('.username.error')
        const passErr = document.querySelector('.password.error')
        form.addEventListener('submit', async (e) => {
            e.preventDefault()


            const username = form.username.value
            const password = form.password.value

            try {
                await fetch('/login', {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-type': 'application/json' }
                }).then(async res => {
                    await res.json()
                        .then(data => {
                            console.log(data)
                            if(data.err){
                                userErr.textContent = data.err.username
                                passErr.textContent = data.err.password
                            }

                            if(data.user){
                                location.assign('/home')
                            }
                        })
                })

            } catch (err) {
                console.log('fetch error: ', err)
            }
        })