import { describe, expect, it, beforeAll } from '@jest/globals';
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { container } from '@/inversify.config';
import { SongBookModule } from '@/store/songBook-module';
import { initializeModules } from '@/store';
import { GetSheetData, GetSongs } from '@kylefinley.net/songbook/src';
import { bootstrapper as songbookBootstrapper } from "@kylefinley.net/songbook/src";

export const storeFactory = (commit?: any) => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const store = new Vuex.Store({
    plugins: [
      initializeModules,
    ],
    modules: {
      "SongBook": SongBookModule
    }
  });

  if (commit !== undefined) {
    store.commit = commit;
  }

  return store;
};

const mockData = {
  data: {
    "range": "'Jazz Standards'!A1:B1109",
    "majorDimension": "ROWS",
    "values": [
      ["Song", "Lead Sheet"], ["500 Miles High", "https://drive.google.com/file/d/1pz9FWaJaYzGoi2zX2_jjn715jx6ATOvZ/view"], ["502 Blues (Drinkin' and Drivin')", "https://drive.google.com/file/d/145pdqjtPl5-od63xPtF-3WU-4KXagtPl/view"], ["A Foggy Day", "https://drive.google.com/file/d/1NYUs3xDeb82WfhrGq7yHIXmqjLW8k_Lo/view"], ["A Night in Tunisia", "https://drive.google.com/file/d/1AzGVW9peRYSR79vM1EhCOwgdkLwEoJQY/view"], ["A Night Like This"], ["A Nightingale Sang in Berkley Sq", "https://drive.google.com/file/d/1HgqZrbm5v_7CMziV6R_06yvwh4ibW33A/view"], ["A Weaver Of Dreams", "https://drive.google.com/file/d/16Uxkb-iDwKm06zZRyAdY0mO9p-Ws41Sf/view"], ["Afternoon In Paris", "https://drive.google.com/file/d/1jesARyLlQlCu_CQwZsDrNAvSLi2ruOmb/view"], ["Ain't Misbehavin", "https://drive.google.com/file/d/1bKygJsZU5zMlDNkulrcTojcWQJ92V4Sy/view"], ["Ain't No Sunshine"], ["Ain't That a Kick"], ["Alfie's Theme", "https://drive.google.com/file/d/19F_MaYi0F2sk3O3THFQq-LQyyuFw1vmv/view"], ["Alice In Wonderland", "https://drive.google.com/file/d/1EvbhWDst5RpiqelzKGrsBdMxe0TWbfxF/view"], ["All Blues", "https://drive.google.com/file/d/1sdTBEv_JzDtcd2jCyI8EbnLNkRgNh0ad/view"], ["All of Me", "https://drive.google.com/file/d/12Euj6cX8Kj5BCBMls5fzJ8TgPX6TLuqJ/view"], ["All of You", "https://drive.google.com/file/d/18DIfaHXti6Wl9MjcShYPg68FeCKuH0gf/view"], ["All or Nothing At All", "https://drive.google.com/file/d/1Ogznyq2vNVYZDY4yY7croweLT9p8kla3/view"], ["All The Things You Are", "https://drive.google.com/file/d/1Wn9S62nPjPlFwJPOZWyNf3-gHdsgpS8a/view"], ["All The Way", "https://drive.google.com/file/d/1lu-AzLHc9yrTLKYLBWZF3WcRxctqWn7j/view"], ["Almost Blue", "https://drive.google.com/file/d/1_uNbDwUFrkkUV0qpGGlJujnIJ_spMGB7/view"], ["Alone Together", "https://drive.google.com/file/d/10yMjsJV5hDqQ-8ZcAuqY-cdb7ZVJMuIc/view"], ["Along Came Betty", "https://drive.google.com/file/d/16_-Y2y04t_ZyyyRcv693gC0sgWlVSg8o/view"], ["Alright, Okay, You Win", "https://drive.google.com/file/d/1Qo5TzUXoRr-Nvk397Vug7JQFsgE7IbyQ/view"], ["Ana Maria", "https://drive.google.com/file/d/1TAcxCgiVpbF4ZfdSRmRUqmNyuRAYQCwZ/view"], ["Angel Eyes", "https://drive.google.com/file/d/1VS28TZDuQasObZ-l6LPmsvT_aAPMkkJM/view"], ["Anthropology", "https://drive.google.com/file/d/1mNzfwtadOxKh8wO-cYd2Zv6kHO0P4bYH/view"], ["April In Paris", "https://drive.google.com/file/d/1qOXArp2FytZ5SyqKXa1R2mN6ufNi_nvD/view"], ["Au Privave", "https://drive.google.com/file/d/1V9IFfkoaXFK8A1nSiJF4_VbpV9K-mm2O/view"], ["Autumn In New York", "https://drive.google.com/file/d/1Dgt-B4twAcq2TenjHMwiGs5VbkFOZRdW/view"], ["Autumn Leaves", "https://drive.google.com/file/d/15V88S4ChJEdRcBhzqFidsw7fXSpkZazN/view"], ["Autumn Liebs", "https://drive.google.com/file/d/1hxK4PhzcMqIhFIx2PB9iAAzK5uVPf-vj/view"], ["Bags' Groove", "https://drive.google.com/file/d/1gFiwjv7As9TXObgZJtVOlVMr9hngUOpD/view"], ["Beatrice", "https://drive.google.com/file/d/1F0BhTEAC3BWWnI21RpJGnY6z_AcabJLn/view"], ["Beautiful Love", "https://drive.google.com/file/d/1e6mv4rxAQO1lmrC4JHoQxX0Fn8Hn34uJ/view"], ["Bemsha Swing", "https://drive.google.com/file/d/1SbFxzWcXCwZ-Vs4Su8hpMU_T5mig_pjV/view"], ["Bernies Tune", "https://drive.google.com/file/d/1-LENr_ovzlly2Z1dm2Ox9eHOslcL0dMz/view"], ["Besame Mucho", "https://drive.google.com/file/d/1-4DqYzYE1jeNNMi9A-XRJqgOHstzJlsZ/view"], ["Bessie's Blues", "https://drive.google.com/file/d/1uqJR1xgF2x5a0QLfJh63jY-JyoQN5vvy/view"], ["Big Bad Handsome Man"], ["Billie's Bounce", "https://drive.google.com/file/d/1mvfZQLv8517GDQ7Q85sPWkmoZxSYS2KD/view"], ["Birk's Works", "https://drive.google.com/file/d/1po_m7oR_MSx3pzmQfWsO7HrWjvu7x5Zr/view"], ["Black and Tan Fantasy", "https://drive.google.com/file/d/1oX0U46Tfq-sbtKT1zGzUaFH2VLeSdvvR/view"], ["Black Nile", "https://drive.google.com/file/d/1TK3eZJAc0-JfnKnyZfOIqGl0XeO3Yyys/view"], ["Black Narcissus"], ["Black Orpheus", "https://drive.google.com/file/d/1xqCqqdYPNvv6GtdaJlH4CmUMnZss-aLE/view"], ["Bloomdido", "https://drive.google.com/file/d/1r_2W5PV16yEoEdXfrdcsefpkQukIs5Bx/view"], ["Blue and Boogie"], ["Blue and Sentimental", "https://drive.google.com/file/d/1Yh-gFEdEvCodXESNNGpJlHmpLWASCQ28/view"], ["Blue Bossa", "https://drive.google.com/file/d/1gm12aGh2vEiqbA2JuHxvUXVhgtJUKBTD/view"], ["Blue In Green", "https://drive.google.com/file/d/175a6kJeQ2Y2X2Ztx1mBEoHwUt-0mpo6P/view"], ["Blue Monk", "https://drive.google.com/file/d/1zidvdkniezEDxzE-B-3EejQ85WAKNLyX/view"], ["Blue Moon", "https://drive.google.com/file/d/11wBa0Etc_QgPXRnpCV19U5swphcBbxNP/view"], ["Blue Room", "https://drive.google.com/file/d/1HzXGaCnnHVJX7fPYDq9XIP2Ttj2aGI9g/view"], ["Blue Skies", "https://drive.google.com/file/d/1s4sJzQJHC8RW8UJHwqz46VK1j7RWzbLu/view"], ["Blue Trane/Train", "https://drive.google.com/file/d/1qPMGowXyEwyoBGbD0MkhOAUTYDG43oCs/view"], ["Bluehawk", "https://drive.google.com/file/d/13_V8l_f4qbn8fpH89EpqNGbnjx540qvZ/view"], ["Blues"], ["Blues By Five", "https://drive.google.com/file/d/17EnvOYYPk-4rzifn2d4vRujA2eWSLJAG/view"], ["Blues For Alice", "https://drive.google.com/file/d/1Mw6R7Hgk5vyMkufFTWb4qqxzfNTo_mu9/view"], ["Blues Changes"], ["Blues In The Closet", "https://drive.google.com/file/d/1yD9C6RIJ___JkCGg8ZSkKihgWN8HPqI_/view"], ["Blues March"], ["Bluesette", "https://drive.google.com/file/d/1JabYOWokyLAcYMEd4E2YmNBsmz1fw9cN/view"], ["Body & Soul", "https://drive.google.com/file/d/13Jl0MEHIG7y-p52VcleMnWv_JZg3xUWp/view"], ["Bolivia", "https://drive.google.com/file/d/1OXpV55sb0WSyv4V6kovb1TIsXwzgsZET/view"], ["Boplicity", "https://drive.google.com/file/d/1cXzDIpd787GOAis37u6Omgqg3XNmbFzP/view"], ["Born Under a Bad Sign"], ["Bunko", "https://drive.google.com/file/d/1sCP6DIEAmb-Hjp8O5KtdLIsoDvhyn1qE/view"], ["But Beautiful", "https://drive.google.com/file/d/1t25PSk7kxITptVZWqbWotDK8kwk7VwxX/view"], ["But Not For Me", "https://drive.google.com/file/d/1SD6624IkKZqtfDtLh0w2WEP1nZ2l4Ldb/view"], ["Bye Bye Blackbird", "https://drive.google.com/file/d/1WW8sP3MamN4LvF34z3sg8NksqxPK0Agj/view"], ["Bye-ya", "https://drive.google.com/file/d/16rnF4jRgw8xXbnGwENxLnY12QYuJGjNY/view"], ["C Jam", "https://drive.google.com/file/d/1LzWjGKf5qRCpfmam8JBU2zotjZfBeWLI/view"], ["C.T.A.", "https://drive.google.com/file/d/1bHNubd47wifsMtEUiUujF72yiqFsFGeR/view"], ["Call Me", "https://drive.google.com/file/d/1F41FCnzYcSaIlKAHSJTUIb97c8WLecUy/view"], ["Call Me Irresponsible"], ["Can't Take My Eyes Off of You", "https://drive.google.com/file/d/1YzjbRzmfg37o5brYeyKTTUv-9m6c3o68/view"], ["Cantelope Island", "https://drive.google.com/file/d/11wSTsTGsrpvB_x95lucdukpsLwLl4IM5/view"], ["Caravan", "https://drive.google.com/file/d/1iCnp27SqMSzB3eisR9g6TUY3GCzoBLDw/view"], ["Ceora", "https://drive.google.com/file/d/1TA5a0Ii1WUYFR8W9Eu6LGVDC4paSEHCh/view"], ["Chain Lightning"], ["Change Is Gonna Come"], ["Chant, The"], ["Charlie Brown Theme", "https://drive.google.com/file/d/1UM451llDrnH4urP9QbQc4UK3Lj4N_eFC/view"], ["Cheek To Cheek", "https://drive.google.com/file/d/139ojeLclqeoh_eiBl7gj_QQGMEzkZPFU/view"], ["Cherokee", "https://drive.google.com/file/d/1gjP1E7qOgfL8GEEQOkax9OqQyOkAq86E/view"], ["Chicken, The", "https://drive.google.com/file/d/1DoR-AayMiH6AHmVHy1dDQmnISUEYKZWm/view"], ["Cissy Strut", "https://drive.google.com/file/d/1fJEZWV4ByWV_zfvR4XBhv88y_eLG7PSL/view"], ["Cold Duck Time", "https://drive.google.com/file/d/18DEJy7aTa9CxvPyWrggYCtQv42c-fuKJ/view"], ["Come Rain Or Come Shine", "https://drive.google.com/file/d/14ExC5a0jQZxZ3Yo1FSXwqg2spX3CyE6B/view"], ["Comin Home Baby", "https://drive.google.com/file/d/1T56bHXtyqxDigtMHa9BREZ4wl6y0BsvQ/view"], ["Confirmation", "https://drive.google.com/file/d/1B2rCyVXigSBViws8Th9oDVYeYKarpRIN/view"], ["Cool Blues", "https://drive.google.com/file/d/1sSN-gQS5CgzztTPZUJtQr_gA1aE0AEyZ/view"], ["Corcovado", "https://drive.google.com/file/d/1UTkFIbQ16RNDuU4ywNa8gRpE-vC8zxa7/view"], ["Cornbread", "https://drive.google.com/file/d/1oshjPojS0wdaJRCm1MfUuRMqY7m6CrrE/view"], ["Cry Me A River", "https://drive.google.com/file/d/1YUHcw53AtJnqZLLA4Hu7LkonBAGezOFW/view"], ["Daahoud"], ["Dancing In The Dark", "https://drive.google.com/file/d/1RUh1iP0QI9XU4ACn1tmUWpGIajTVsUJM/view"], ["Dancing On The Ceiling", "https://drive.google.com/file/d/1LoS5BMZdFBmK3o0-iti64lCmMPFvIlVB/view"], ["Darn That Dream", "https://drive.google.com/file/d/19j1lJbe3YUU4v5p7YieBUBfgVLF_rUfe/view"], ["Dat Dere", "https://drive.google.com/file/d/1uiEnmXnAzJo7hnjdkiWrqnovxrGFPG-O/view"], ["Days of Wine & Roses", "https://drive.google.com/file/d/1fKL25ITWVlwe--l_3mUrg4EOztSTi0oi/view"], ["Dear Old Stockholm", "https://drive.google.com/file/d/1Cixn4jnaweeOdQu8KVnT2L06S2C09g1T/view"], ["Deep Night"], ["Delilah", "https://drive.google.com/file/d/1VjO8RgTkf1psVhah4uNQjQulWDjnh9Z3/view"], ["Desafinado", "https://drive.google.com/file/d/1wUL5DOVdQ8g8wttuBiO60RW2PJ8hLA16/view"], ["Dexterity", "https://drive.google.com/file/d/1LjnqP8NOprYBeMeUWJSPEAD_i0-LvnzE/view"], ["Dig Dis", "https://drive.google.com/file/d/1KkEmM5n2nLsVujjX8kLMvOKPVGaryFhy/view"], ["Dindi", "https://drive.google.com/file/d/1x2jMv4HkNRcmCnzKkaBu9adALNPcYZMU/view"], ["Do Nothin' Till You Hear From Me"], ["Do you know what it means"], ["Dock of the Bay"], ["Dolphin Dance"], ["Don't Get Around Much Anymore"], ["Doxy", "https://drive.google.com/file/d/1xm5fPsDbCxMYD25EXZ9AR7lmfNRmEaYz/view"], ["Driftin'"], ["Duke of Iron"], ["East of the Sun"], ["Easy Does It"], ["Embraceable You"], ["Emily"], ["Equinox"], ["Every Time We Say Goodbye"], ["Everything happens to me"], ["Exactly Like You"], ["Expression"], ["Falling in Love with Love"], ["Fee-Fi-Fo-Fum"], ["Fever"], ["Flinstones"], ["Fly Me To The Moon", "https://drive.google.com/file/d/14wwc8nXC7524z2-LvK9vhNFdNP_ZregI/view"], ["Footprints"], ["Footsteps"], ["Four"], ["Freddie The Freeloader"], ["Gemini"], ["Georgia On My Mind"], ["Giant Steps"], ["Girl From Ipanema", "https://drive.google.com/file/d/1dTjriaL6rZMZ2VkkxZX2CJF8n9tOqTfW/view"], ["Gloria's Step"], ["God Bless The Child"], ["Green Chimneys"], ["Green Dolphin St"], ["Groovy Samba"], ["Hard Times"], ["Have you met Ms. Jones"], ["Hide & Seek"], ["How About You"], ["How High The Moon"], ["How Insensitive"], ["How My Heart Sings"], ["I Could Write a Book"], ["I Got It Bad (And That Ain't Good)"], ["I Let A Song Go Out Of My Heart"], ["I love you"], ["I Remember Clifford"], ["I Remember You"], ["I Want To Talk About You"], ["I'd Rather Be Blind"], ["I'll Be Seeing You"], ["I'll Remember April"], ["I'm an Old Cowhand"], ["I'm Confessin' That I Love You", "https://drive.google.com/file/d/1sIIoqRiPmVpOTUyhulBMGT7OjiffgSMw/view"], ["I'm Getting Sentimental Over You"], ["I'm Old Fashioned"], ["I'm On My Way"], ["I've never been in love before"], ["If I Were A Bell"], ["If You Could See Me Now"], ["If You Never Come To Me"], ["Impressions"], ["In a Mellow Tone"], ["In a Sentimental Mood"], ["In walked bud"], ["Incompatibilidade de Genios"], ["Invitation"], ["Is You Is or Is You Ain't (My Baby)"], ["Israel"], ["It Could Happen To You"], ["It Don't Mean a Thing"], ["It Might As Well Be Spring"], ["It Never Entered My Mind"], ["It's All Right With Me"], ["It's Oh, So Nice"], ["Its Your Vodoo Workin"], ["Jeannine"], ["Jitterbug waltz"], ["Jive Samba"], ["Jordu"], ["Joy Spring"], ["Juicy Lucy"], ["JuJu"], ["Just a Lucky So and So"], ["Just Friends"], ["Just In Time"], ["Just One Look"], ["Just The Way Your Are"], ["Killer Joe", "https://drive.google.com/file/d/1GcP_0ESpNhVtGfSGyfkYzV9sMjcWO1pw/view"], ["Killing Me Softly with His Song"], ["Lady Be Good"], ["Lady Bird"], ["Lazy Bird"], ["Let's cool one"], ["Light Blue"], ["Like someone in love"], ["Listen Here!"], ["Little Girl Blue"], ["Little One"], ["Little Sunflower"], ["Locamotion"], ["Long ago Far Away"], ["Lonnie's Lament"], ["Look to the Sky"], ["Love For Sale", "https://drive.google.com/file/d/1swAUsnusu_7DBlL7PIhVsOSGYta9l0Mx/view"], ["Love Is Here To Stay"], ["Loverman"], ["Lullaby"], ["Lullaby of Birdland", "https://drive.google.com/file/d/1zAQUKKRjkq130sa3JO4Qvn-LSuehnwl1/view"], ["Lullaby of the leaves"], ["Lulu's Back In Town"], ["Maiden Voyage"], ["Masquerade Is Over (I'm Afraid The)"], ["Mean to Me"], ["Melody For C"], ["Mercy, Mercy, Mercy", "https://drive.google.com/file/d/1r7idFibNtW1hCJf4OKAjY5jrsyccnHn5/view"], ["Milestones"], ["Minor Swing"], ["Minority"], ["Mistreated But Undefeated"], ["Misty"], ["Mo Better Blues"], ["Moanin'"], ["Moment's Notice"], ["Money Junble"], ["Monks dream"], ["Mood Indigo"], ["Moonglow"], ["Moten Swing"], ["Mr. Bow Tie"], ["Mr. P.C.", "https://drive.google.com/file/d/1s39YWHZc_xzWhZkcYwzIPXfFRpcCt47F/view"], ["My Favorite Things"], ["My Funny Valentine"], ["My Ideal"], ["My Little Suede Shoes"], ["My One and Only Love"], ["My Romance"], ["My Way"], ["Naima"], ["Nardis"], ["Nearness Of You"], ["Never Let Me Go"], ["Nicas dream"], ["Night and Day"], ["Night Train"], ["No More Blues"], ["Nostalgia In Times Square"], ["Now's The Time"], ["Oh Gee"], ["Old Devil Moon"], ["Oleo"], ["On Broadway"], ["On The Street Where You Live"], ["On The Sunny Side Of The Street", "https://drive.google.com/file/d/11DiKKe6isjxzBD7KP-Xnj3Kgyt8fbphP/view"], ["One For Daddy-O"], ["One Note Samba"], ["Ornithology"], ["Our Love Is Here To Stay"], ["Out of Nowhere"], ["Pat 'n Chat"], ["Pent Up House"], ["Perhaps, Perhaps, Perhaps"], ["Ping Pong"], ["Pitter Panther Patter"], ["Polka Dots and Moonbeams"], ["Porgy (I Loves You, Porgy)"], ["Prelude to a Kiss"], ["Raggedy Ann"], ["Recordame"], ["Red Clay"], ["Remember"], ["Reunion Blues"], ["Rio De Janeiro Blues"], ["Round Midnight"], ["Route 66"], ["Ruby My Dear"], ["Sack O'Woe"], ["Samba De Orfeu"], ["Sandu", "https://drive.google.com/file/d/1bhPqFtiFESjDQ4farDfvp0NzO-tga1wP/view"], ["Satin Doll"], ["Scotch & Water"], ["Scrapple from the apple"], ["Sea journey"], ["Seascape"], ["Segment"], ["Senhoras do Amazonas"], ["Señor Blues"], ["Seven Steps To Heaven"], ["Sidewinder"], ["Silver Serenade"], ["Sister Sadie"], ["Skating In Central Park"], ["So What"], ["Softly As In A Morning Sunrise", "https://drive.google.com/file/d/1WD7cE8XHvXezf2vMawT8Am3kiuNNT64B/view"], ["Solar", "https://drive.google.com/file/d/1i_fNI8Ai9TadsLSUFkfm8PsTl8f7HEPJ/view"], ["Solitude"], ["Somebody Loves Me"], ["Someday my prince will come"], ["Somethin' Else"], ["Song For My Father", "https://drive.google.com/file/d/1JDLS3JzKAmHrX8eh0zyQvJTQR0CBSJnw/view"], ["Sophisticated Lady", "https://drive.google.com/file/d/1i0GgRqU9WUptLfT3K56D8JZlpQK6tQSe/view"], ["Soul Eyes"], ["Soular Energy"], ["Speak No Evil"], ["Spring Is Here"], ["St. James infermary"], ["St. Loius Blues"], ["St. Thomas"], ["Stablemates"], ["Star Eyes"], ["Stardust"], ["Stella By Starlight", "https://drive.google.com/file/d/1tL6sEUV1dWixwduzZ9y1iWbPj47NeSBM/view"], ["Stepping Out"], ["Sticks"], ["Stolen Moments"], ["Stompin at the Savoy", "https://drive.google.com/file/d/1QQo7BK6hlnUYXt4tgZ2z2XaYBaqTJxRt/view"], ["Straight No Chaser"], ["Strangers In The Night"], ["Strasbourg St. Denis", "https://drive.google.com/file/d/1445VmPZLmypx6xJmg9X44FpyKl3lc-Oz/view"], ["Sugar"], ["Summer Wind"], ["Summertime"], ["Sunny", "https://drive.google.com/file/d/19-38BHn_8KIg7ME4t5QHh4gl4yl7H0yM/view"], ["Super Blue"], ["Sweet Georgia Brown"], ["Swing Gitan"], ["Take 5"], ["Take A Chance"], ["Take the A Train"], ["Tangerine"], ["Tea for two"], ["Teach Me Tonight"], ["Temptation"], ["Tenderly"], ["Tennessee waltz"], ["Tenor Madness"], ["Teo"], ["Tequila"], ["That's All"], ["The Dry Cleaner from Des Moines"], ["The Jody Grind"], ["The Look Of Love"], ["The Night Has a Thousand Eyes"], ["The Preacher"], ["The song is you"], ["The Very Thought of You"], ["The Way You Look Tonight"], ["Then I'll Be Tired Of You"], ["There Is No Greater Love"], ["There will never be another you"], ["They Can't Take That Away From Me"], ["Things Ain't What They Used To Be"], ["Think On Me"], ["This Can't Be Love"], ["This I Dig Of You"], ["This Masquerade"], ["Tico tico"], ["Till there was you"], ["Time Remembered"], ["Tom Cat", "https://drive.google.com/file/d/1t0MHpIsK-0wKse_tT2mEHiTqjmQysCnS/view"], ["Totem Pole"], ["Trinkle, Tinkle"], ["Triste"], ["Twice Around"], ["Twisted"], ["Two Bass Hit"], ["U + night + music"], ["U go 2 my head"], ["Up Jumped Spring"], ["Valerie"], ["Valsa Hot"], ["Waltz for Debby"], ["Watch What Happens"], ["Watermelon Man"], ["Wave"], ["Weaver of Dreams"], ["Well you needn't"], ["West Coast Blues", "#ERROR!"], ["Whats new"], ["When I Fall in Love", "https://drive.google.com/file/d/1Gm0m6kMYA21e8dx9iXQWsttKKuqCKeGb/view"], ["Whisper Not"], ["Why Am I Treaded So Bad"], ["Willow Weep For Me", "https://drive.google.com/file/d/1wbCXY2iEsSyjlNDDAtJOND5y0r4QOSZk/view"], ["Windows"], ["Witchcraft"], ["Without a song"], ["Work Song"], ["Yardbird Suite"], ["Yesterdays"], ["You And The Night And The Music"], ["You Are Too Beautiful"], ["You Don't Know"], ["You Don't Know Me"], ["You Look Good To me"], ["You'd Be So Nice To Come Home To"]
    ]
  }
};

describe("SongBookModule", () => {

  describe("GetSongs", () => {
    describe("Success", () => {

      const commit = jest.fn();
      const getSheetDataRunAsyncMock = jest.fn();

      beforeAll(async () => {

        // Arrange
        const store = storeFactory(commit);

        // overide the runAsync method to return mock data
        GetSheetData.prototype.runAsync = getSheetDataRunAsyncMock;
        getSheetDataRunAsyncMock.mockReturnValue(Promise.resolve(mockData));

        // Bootstraping only the sheets commands module
        songbookBootstrapper(container);

        // Act
        await store.dispatch("SongBook/getSongs");
      });

      it("runs", () => {
        expect(commit);
      });

      it("should set the status to Loading", () => {

        // Assert
        expect(commit).toHaveBeenNthCalledWith(3,
          "SongBook/mutate",
          expect.any(Function),
          undefined
        );

        // Check that the function passed to mutate is correct.
        expect(commit.mock.calls[0][1].toString()).toBe('(state) => state.status = state_1.Status.Loading');

      });

      it("should run GetSheetDataCommand", () => {
        // This could be removed b/c it's not really a concern of the SongBook Module and more something that happens down the chain.
        // But since we had to mocked it we might as well test it.

        // Assert
        expect(getSheetDataRunAsyncMock).toHaveBeenCalledWith(GetSongs.DefaultGetSheetDataRequest);

      });

      it("should set the songs property", () => {
        expect(commit).toHaveBeenNthCalledWith(3,
          "SongBook/mutate",
          expect.any(Function),
          undefined
        );

        // Check that the function passed to mutate is correct.
        expect(commit.mock.calls[1][1].toString()).toBe('(state) => state.songs = songs');


      });

      it("should set the status to Loaded", () => {

        // Assert
        expect(commit).toHaveBeenNthCalledWith(3,
          "SongBook/mutate",
          expect.any(Function),
          undefined
        );

        // Check that the function passed to mutate is correct.
        expect(commit.mock.calls[2][1].toString()).toBe('(state) => state.status = state_1.Status.Loaded');

      });
    });
  });

});
