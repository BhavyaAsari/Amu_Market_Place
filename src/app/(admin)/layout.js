

export default function AdminLayout({children}) {

    return (


        <>
        <main className="admin-layout">
            <section>
                {children}
            </section>
        </main>
        </>
    )
}