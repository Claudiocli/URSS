package it.urss.payball8.controller.pages;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import it.urss.payball8.model.Account;
import it.urss.payball8.repository.AccountRepository;
import it.urss.payball8.repository.FriendshipRepository;
import net.minidev.json.JSONObject;

@RestController
@RequestMapping(path = "/home")
public class HomePageController {
	Logger logger = LoggerFactory.getLogger(HomePageController.class);

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private FriendshipRepository friendshipRepository;

	@PostMapping("")
	Account homePage(@RequestBody JSONObject id) {
		Long id_long = new Long(id.getAsString("id"));
		Account current_user = accountRepository.findById(id_long)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find user"));
		logger.info("HOMEPAGE_ACCOUNT: " + current_user.getEmail());

		return current_user;
	}

	@PostMapping("/friendship")
	void listFriendship(@RequestBody JSONObject id){
		Long id_long = new Long(id.getAsString("id"));
		Account current_user = accountRepository.findById(id_long)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find user"));
		logger.info("Frind: "+ friendshipRepository.findAllByaccount2(id_long));


	}



}
