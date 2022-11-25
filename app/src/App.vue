<template>
  <div id="app">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
            <div class="container px-5">
                <div class="d-flex d-md-block flex-column align-items-center">
                    <img src="/assets/img/tnw-logo.svg" height="40" width="40"/>
                    <a class="navbar-brand fw-bold mx-0" href="#page-top">SBF Trust</a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="bi-list"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#features">Not Convinced?</a></li>
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#game-rules">Read Rules</a></li>
                        <li class="nav-item"><sign-in-box/></li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Mashead header-->
        <header class="masthead">
            <everx-loader/>
            <router-view/>
        </header>

        <!-- Quote/testimonial aside-->
        <aside class="text-center bg-gradient-primary-to-secondary">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-xl-8">
                        <div class="h2 fs-1 text-white mb-4"></div>
                        <figure>
                          <blockquote class="blockquote h2 fs-1 text-white mb-4">
                            <p>I firmly believe there will be degens who trust this nonsense to snatch a few bucks fast.</p>
                          </blockquote>
                          <figcaption class="blockquote-footer text-white">
                            Michael Bertman, <cite title="Source Title">Gugle CEO</cite>
                          </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </aside>
        <!-- App features section-->
        <section id="features">
            <div class="container px-5">
                <div class="row gx-5 align-items-center">
                    <div class="col-lg-8 order-lg-1 mb-5 mb-lg-0">
                        <div class="container-fluid px-5">
                            <div class="row gx-5">
                                <div class="col-md-6 mb-5">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-calculator icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">100% Smart</h3>
                                        <p class="text-muted mb-0">Outsmart our contracts and others and grab $$$</p>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-5">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-person-bounding-box icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">Untraceable</h3>
                                        <p class="text-muted mb-0">We don't keep any of your data, stay SAFU</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-5 mb-md-0">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-life-preserver icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">Last Chance</h3>
                                        <p class="text-muted mb-0">What else on the market can give you anything comparable?</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <!-- Feature item-->
                                    <div class="text-center">
                                        <i class="bi-patch-check icon-feature text-gradient d-block mb-3"></i>
                                        <h3 class="font-alt">Open Source</h3>
                                        <p class="text-muted mb-0">Explore, hack, duplicate, build upon!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 order-lg-0">
                        <!-- Features section device mockup-->
                        <img src="~@/assets/img/sam-in-suite.png" class="img-fluid" />
                    </div>
                </div>
            </div>
        </section>
        <!-- Basic features section-->
        <section class="bg-light" id="game-rules">
            <div class="container px-5">
                <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
                    <div class="col-12">
                        <h2 class="display-4 lh-1 mb-4">Game Rules</h2>
                        <p class="lead fw-normal mb-3">
                            1. You deposit your EVERs, claim whenever you want and receive EVERs directly to your wallet. No TIP3. No NFT. No shit.
                        </p>
                        <p class="lead fw-normal mb-3">
                            2. It is obviously <b>not possible</b> to return your deposit (say hello to CEX). You earn <b>only</b> by claiming. This is reflected in the UI. Your farming value is nothing. Your depo is nothing. You earn only what you claim.
                        </p>
                        <p class="lead fw-normal mb-3">
                            3. You receive 10% of your depo each minute. With such a crazy ARR % you can recover 100 EVER and grab extra 50% as a premium until game completes.
                        </p>
                        <p class="lead fw-normal mb-3">
                            4. After 30 minutes each game is blocked by any random reason (SEC, sudden audit, hack attempt). You won't be able to interact with the game after this. Those who've managed to claim tokens are good. Others are rug pulled.
                        </p>
                        <p class="lead fw-normal mb-3">
                            5. Since this is a 100% crypto project, it is buggy as hell. It is so buggy that we even provide an information about the error probability. When an error happens, just forget about your depo. The game gets blocked, and all depos run away to our shady wallets.
                        </p>
                        <p class="lead fw-normal mb-3">
                            6. This game is a crunchy WEB 3.0 garbage to the extent that we even do not know when to end the game. A player who completes the game <b>receives 1 EVER</b> as a premium. Yes, you literally can earn by clicking COMPLETE.
                        </p>
                        <p class="lead fw-normal mb-3">
                            7. The game has a referral program. If you invite a friend, 15% of EACH their depo <b>directly and instantly</b> will go to your wallet. No limits. No shit. This lasts until somebody else sends them their referral link. So you'd better sugar-coat your story about the game and be pushy spamming your friends like hell.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- App badge section-->
        <section class="bg-gradient-primary-to-secondary" id="download">
            <div class="container px-5">
                <h2 class="text-center text-white font-alt mb-4">Enough for reading. Start playing now!</h2>
            </div>
        </section>
        <!-- Footer-->
        <footer class="bg-black text-center py-5">
            <div class="container px-5">
                <div class="text-white-50 small">
                    <div class="mb-2">&copy; Your Website 2022. All Rights Reserved.</div>
                    <a href="#!">Privacy</a>
                    <span class="mx-1">&middot;</span>
                    <a href="#!">Terms</a>
                    <span class="mx-1">&middot;</span>
                    <a href="#!">FAQ</a>
                </div>
            </div>
        </footer>
  </div>

</template>

<script>
import EverxLoader from "@/components/EverxLoader";
import SignInBox from "@/components/SignInBox";

const App = {
  name: 'App',
  components: {SignInBox, EverxLoader}
}

export default App;
</script>

<style>
.btn-light, .btn-light:focus {
  background-color: #f5de09;
  border-color: #1a1e21;
}
.btn-light:hover {
  background-color: rgb(228, 220, 140);
  border-color: #1a1e21;
}

.btn-light:disabled {
  background-color: white;
  border-color: #1a1e21;
}

.loading-overlay {
    opacity: 0.2;
}
</style>
