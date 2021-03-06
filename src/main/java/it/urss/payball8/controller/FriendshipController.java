package it.urss.payball8.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import it.urss.payball8.model.Account;
import it.urss.payball8.model.Friendship;
import it.urss.payball8.repository.AccountRepository;
import it.urss.payball8.repository.FriendshipRepository;
import net.minidev.json.JSONObject;

@RestController
@RequestMapping(path = "/friendship")
public class FriendshipController {
	Logger logger = LoggerFactory.getLogger(FriendshipController.class);

	@Autowired
	private FriendshipRepository friendshipRepository;

	@Autowired
	private AccountRepository accountRepository;

	@PostMapping(path = "/add")
	ResponseEntity<Friendship> addFriendId(@RequestBody Friendship friendship) {
		logger.info("ADD FRIEND WITH ID");
		return ResponseEntity.ok(friendshipRepository.save(friendship));
	}

	@PostMapping(path = "/all")
	List<Account> listFriendship(@RequestBody JSONObject id) {
		String id_long = id.getAsString("id");
		accountRepository.findById(id_long)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find user"));

		List<Account> list_account = new ArrayList<Account>();
		List<Friendship> list_friends1 = friendshipRepository.findAllByaccount1(id_long);
		List<Friendship> list_friends2 = friendshipRepository.findAllByaccount2(id_long);
		for (Friendship friend : list_friends1)
			list_account.add(accountRepository.findById(friend.getAccount2())
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find user")));
		for (Friendship friend : list_friends2)
			list_account.add(accountRepository.findById(friend.getAccount1())
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find user")));

		logger.info("LIST_FRIENDS:" + list_account);
		return list_account;
	}

	@DeleteMapping("/delete")
	void deleteFriendship(@RequestBody Friendship friendship) {
		Friendship friendship1_2 = friendshipRepository.findByAccount1AndAccount2(friendship.getAccount1(),
				friendship.getAccount2());
		Friendship friendship2_1 = friendshipRepository.findByAccount2AndAccount1(friendship.getAccount1(),
				friendship.getAccount2());
		if (friendship1_2 != null) {
			friendshipRepository.delete(friendship1_2);
			logger.info("FRIENDSHIP_DELETE deleted friendship");
		}
		if (friendship2_1 != null) {
			friendshipRepository.delete(friendship2_1);
			logger.info("FRIENDSHIP_DELETE deleted friendship");
		}
	}

}
