const app = document.getElementById("app")

const users =[
    {
        email: 'test@test.com',
        phone: '9999999999',
        ref: 100,
        refBy: null
    },
    {
        email: 'tust@tust.com',
        phone: '9999999999',
        ref: 200,
        refBy: 100
    },
    {
        email: 'tost@tost.com',
        phone: '9999999999',
        ref: 300,
        refBy: 200
    }
]

const getUser = (userData) => {
    return users.find((user) => {
        return user.email == userData.email
    })
}

const getTotalSubscribers = (userData) => {
    const subs = users.filter((user) => {
        return user.refBy == userData.ref
    })
    return subs.length
}

const showInvite = (userData) => {
    app.innerHTML = `
        <main>
                <h3>Inscrição confirmada!</h3>
                <p>
                    Convide mais pessoas e concorra a prêmios!<br>
                    Compartilhe o link e acompanhe as inscrições:
                </p>

                <div class="input-group">
                    <label for="link">
                        <img src="./assets/image/link.svg" alt="Link icon" class="link-icon">
                    </label>
                    <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled />
                </div>
            </main>

            <section class="stats">
                <h4>${getTotalSubscribers(userData)}</h4>
                <p>Incrições feitas</p>
            </section>
    `
}

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 4000),
        refBy: 100
    }

    users.push(newUser)
    console.log(users)
    return newUser
}

const formAction = () => {
    const form = document.getElementById("form")
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const userData = {
            email: formData.get('email'),
            phone: formData.get('phone')
        }

        const user = getUser(userData)
        
        if(user) {
            //encontrei o user
            showInvite(user)
        } else {
            //não encontrei o user
            const newUser = saveUser(userData)
            showInvite(newUser)
        }
    }
}

const startApp = () => {
    const content = `
        <main>
                <section class="about">
                    <div class="section-header">
                        <h2>Sobre o evento</h2>
                        <span class="badge">Ao vivo</span>
                    </div>

                    <p>Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons. <br><br>
                    Dias 15 a 17 de março | Das 18h às 21h | Online &amp; Gratuito </p>
                </section>

                <section class="registration">
                    <h2>Inscrição</h2>

                    <form id="form">
                        <div class="input-wrapper">
                            <div class="input-group">
                                <label for="email">
                                    <img src="./assets/image/mail.svg" alt="E-mail icon">
                                </label>
                                <input type="email" id="email" name="email" placeholder="E-mail">
                            </div>

                            <div class="input-group">
                                <label for="phone">
                                    <img src="./assets/image/phone.svg" alt="Phone icon">
                                </label>
                                <input type="text" id="phone" name="phone" placeholder="Telefone">
                            </div>

                            <button>
                                Confirmar
                                <img src="./assets/image/arrow-right.svg" alt="Arrow right">
                            </button>
                        </div>
                    </form>
                </section>
            </main>
    `

    app.innerHTML = content

    formAction()
}

startApp()


document.getElementById("logo").onclick = () => startApp()