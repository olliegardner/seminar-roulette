# Meeting 4 - 23 Oct 2020

The meeting started off with me showing Jeremy the prototype which I had developed over the past week. This was an extremely basic prototype but Jeremy was excited to see the development of the project underway. As I was demonstrating the random seminar feature to Jeremy, he noticed that if a recurring seminar was chosen then it wasn't displaying the most recent one.

Shibboleth is still causing some issues on the VM as IT services will not open up port 80 to the internet. Instead, Jeremy suggested that I try use a self-signed certificate to SSL enable the server. Once HTTPS has been setup, then Shibboleth should work correctly. Jeremy doesn't think that it would be a big issue if we can't get Shibboleth working but it would definitely be a nice feature to have on the system. There is always the option of having a separate login system.

As I have installed a lot of different things onto the VM and had to confugure it from scratch, Jeremy suggested that I create some sort of bash script which allow me to easily transfer over to another VM with the same setup if need be. I will look into this.

Finally, we discussed the goals for next week. I will continue hacking away at the VM and start creating a beautiful frontend for the system. Jeremy would like me to find a way of keeping track of which seminars a user has attended. Perhaps, if a seminar is recommended to a user, next time they log in, the system asks "did you attend this seminar?".
